using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Production.Domain.Repositories;
using Production.Domain.Services;
using Production.Infrastructure.Persistence;
using Production.Infrastructure.Repositories;
using Production.Infrastructure.Services;

namespace moc_production_service
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = new ConfigurationBuilder()
                .AddEnvironmentVariables().Build();

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOpenApiDocument();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddScoped<DbContext, ProductionContext>();
            services.AddScoped<IProductsRepository, ProductsRepository>();
            services.AddScoped<IManufacturingPlanRepository, ManufacturingPlanRepository>();
            services.AddScoped<IManufacturingPlanService, ManufacturingPlanService>();
            services.AddScoped<IProductService, ProductService>();
            
            services.AddScoped(typeof(IAsyncRepository<>), typeof(GenericRepository<>));
            
            var constr = Environment.GetEnvironmentVariable("MOC_Production_DB");
            
            if (!string.IsNullOrEmpty(Configuration.GetConnectionString("MOC_Production_DB")))
                services.AddDbContext<ProductionContext>(options => options.UseSqlServer(Configuration.GetConnectionString("MOC_Production_DB")));
            else if(!string.IsNullOrEmpty(constr))
                services.AddDbContext<ProductionContext>(options => options.UseSqlServer(constr, b => b.MigrationsAssembly("Production.API")));
            else
                services.AddDbContext<ProductionContext>(options => options.UseInMemoryDatabase("Production"));
        }
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseOpenApi(); // serve OpenAPI/Swagger documents
            app.UseSwaggerUi3(); // serve Swagger UI
            app.UseReDoc(); // serve ReDoc UI
        }
    }
}