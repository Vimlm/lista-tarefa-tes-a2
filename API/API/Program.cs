using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(
  options => options.AddPolicy("Acesso Total",
    configs => configs.AllowAnyOrigin()
      .AllowAnyHeader()
      .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5273/categoria/listar
app.MapGet("/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
	if (ctx.Categorias.Any())
	{
		return Results.Ok(ctx.Categorias.ToList());
	}
	return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5273/categoria/cadastrar
app.MapPost("/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
	ctx.Categorias.Add(categoria);
	ctx.SaveChanges();
	return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/tarefas/listar
app.MapGet("/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
	if (ctx.Tarefas.Any())
	{
		return Results.Ok(ctx.Tarefas.ToList());
	}
	return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/tarefas/cadastrar
app.MapPost("/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
	Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
	if (categoria == null)
	{
		return Results.NotFound("Categoria não encontrada");
	}
	tarefa.Categoria = categoria;
	ctx.Tarefas.Add(tarefa);
	ctx.SaveChanges();
	return Results.Created("", tarefa);
});

//PUT: http://localhost:5273/tarefas/alterar/{id}
app.MapPut("/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
	//Implementar a alteração do status da tarefa
	Tarefa? tarefa = ctx.Tarefas.Find(id);
	if (tarefa == null)
	{
		return Results.NotFound("Tarefa não encontrada");
	}

	if (tarefa.Status == "Não iniciada")
	{
		tarefa.Status = "Em andamento";
	} else if (tarefa.Status == "Em andamento")
	{
		tarefa.Status = "Concluída";
	} else
	{
		return Results.BadRequest("Tarefa já concluída");
	}

	ctx.Tarefas.Update(tarefa);

	ctx.SaveChanges();

	return Results.Ok(tarefa);
});

//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
	//Implementar a listagem de tarefas não concluídas

	if (ctx.Tarefas.Any())
	{
		return Results.Ok(ctx.Tarefas.Where(t => t.Status != "Concluída").ToList());
	}

	return Results.NotFound("Nenhuma tarefa não concluída encontrada");
});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
	//Implementar a listagem de tarefas concluídas

	if (ctx.Tarefas.Any())
	{
		return Results.Ok(ctx.Tarefas.Where(t => t.Status == "Concluída").ToList());
	}

	return Results.NotFound("Nenhuma tarefa concluída encontrada");
});

app.UseCors("Acesso Total");
app.Run();
