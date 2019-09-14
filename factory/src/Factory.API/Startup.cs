using System;
using Factory.Domain.Repositories;
using Factory.Domain.Services;
using Factory.Infrastructure.Persistence;
using Factory.Infrastructure.Repositories;
using Factory.Infrastructure.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Factory.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; private set; }
        
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            
            #region swagger
            services.AddOpenApiDocument(c => c.PostProcess = doc =>
            {
                doc.Info.Version = "v1";
                doc.Info.Title = "Master Data Factory (MDF) - API";
                doc.Info.Description = "Rest API for MDF Master Data Factory";
            });

            #endregion

            #region DI Container
            services.AddScoped<IOperationRepository, OperationRepository>();
            services.AddScoped<IMachineRepository, MachineRepository>();
            services.AddScoped<IMachineTypeRepository, MachineTypeRepository>();
            services.AddScoped<IMachineTypeOperationRepository, MachineTypeOperationRepository>();
            services.AddScoped<IProductionLineRepository, ProductionLineRepository>();
            services.AddScoped<IToolRepository, ToolRepository>();

            services.AddScoped<IOperationService, OperationService>();
            services.AddScoped<IMachineTypeService, MachineTypeService>();
            services.AddScoped<IMachineService, MachineService>();
            services.AddScoped<IProductionLineService, ProductionLineService>();
            services.AddScoped<IToolService, ToolService>();
            
            services.AddScoped(typeof(IAsyncRepository<>), typeof(GenericRepository<>));


            #endregion

            var constr = Environment.GetEnvironmentVariable("MOC_FACTORY_DB");
            
            if (!string.IsNullOrEmpty(Configuration.GetConnectionString("MOC_FACTORY_DB")))
                services.AddDbContext<FactoryContext>(options => options.UseSqlServer(Configuration.GetConnectionString("MOC_FACTORY_DB"), b=> b.MigrationsAssembly("Factory.API")));
            else if (!string.IsNullOrEmpty(constr))
                services.AddDbContext<FactoryContext>(options => options.UseSqlServer(constr,b => b.MigrationsAssembly("Factory.API")));
            else
                services.AddDbContext<FactoryContext>(options => options.UseInMemoryDatabase("Factory"));
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            //app.UseTokenAuth();
            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseOpenApi(); // serve OpenAPI/Swagger documents
            app.UseSwaggerUi3();
        }

    }
}