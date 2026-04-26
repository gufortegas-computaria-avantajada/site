using System.Text;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("ok", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddHttpClient();

var app = builder.Build();

app.UseCors("ok");

app.MapGet("/", () => Results.Text("API online 🔥"));

app.MapPost("/ia", async (HttpContext context, IHttpClientFactory httpFactory) =>
{
    var body = await JsonSerializer.DeserializeAsync<Mensagem>(
        context.Request.Body,
        new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
    );

    if (body == null || string.IsNullOrWhiteSpace(body.Msg))
        return Results.Text("NÃO VERIFICÁVEL: mensagem vazia");

    var resposta = await IAComPesquisa(body.Msg, httpFactory);
    return Results.Text(resposta);
});

app.Run();


// ================= IA OLLAMA =================
static async Task<string> IAComPesquisa(string entrada, IHttpClientFactory httpFactory)
{
    var client = httpFactory.CreateClient();

    var prompt = $@"
Você é um sistema automático de verificação de fatos.

Você deve responder SEMPRE em português do Brasil.

NÃO converse.
NÃO faça perguntas.
NÃO dê opinião pessoal.

Formato obrigatório:

VEREDICTO: VERDADEIRO | FALSO | NÃO VERIFICÁVEL
EXPLICAÇÃO:
Responda de forma curta e rápida, máxima de 2 frases curtas.
Seja direto e objetivo.

Pergunta: {entrada}
";

    var payload = new
    {
        model = "llama3",
        prompt = prompt,
        stream = false
    };

    var json = JsonSerializer.Serialize(payload);

    var response = await client.PostAsync(
        "http://localhost:11434/api/generate",
        new StringContent(json, Encoding.UTF8, "application/json")
    );

    if (!response.IsSuccessStatusCode)
        return "ERRO: Ollama não respondeu";

    var resultJson = await response.Content.ReadAsStringAsync();

    using var doc = JsonDocument.Parse(resultJson);

    var result = doc.RootElement
                    .GetProperty("response")
                    .GetString();

    return result ?? "SEM RESPOSTA";
}


// ================= MODELO =================
public class Mensagem
{
    public string? Msg { get; set; }
}