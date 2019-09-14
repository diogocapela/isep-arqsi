using Microsoft.EntityFrameworkCore;
using Production.Domain.AggregatesModel.ManufacturingPlanAggregate;
using Production.Domain.AggregatesModel.OperationAggregate;
using Production.Domain.AggregatesModel;
using Production.Domain.AggregatesModel.OperationManufacturingPlanAggregate;
using Production.Domain.AggregatesModel.ProductAggregate;
using Production.Infrastructure.EntityConfigurations;

namespace Production.Infrastructure.Persistence
{
    public class ProductionContext : DbContext
    {
        public const string DEFAULT_SCHEMA = "production";

        
        public ProductionContext(DbContextOptions<ProductionContext> options) : base(options) {
            //this.ChangeTracker.LazyLoadingEnabled = false;
        }
        
        public DbSet<ManufacturingPlan> ManufacturingPlans { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Operation> Operations { set; get; }
        public DbSet<OperationManufacturingPlan> OperationsManufacturingPlans { set; get; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ManufacturingPlanConfiguration());
            modelBuilder.ApplyConfiguration(new ProductConfiguration());

            modelBuilder.Entity<Operation>().HasIndex(o => o.OperationName).IsUnique();
            
            modelBuilder.Entity<OperationManufacturingPlan>()
                .HasKey(omp => new { omp.OperationId, omp.ManufacturingPlanId });

            modelBuilder.Entity<OperationManufacturingPlan>()
                .HasOne(omp => omp.operation)
                .WithMany(b => b.operationManufacturingPlans)
                .HasForeignKey(bc => bc.OperationId);  

                modelBuilder.Entity<OperationManufacturingPlan>()
                    .HasOne(bc => bc.manufacturingPlan)
                .WithMany(c => c.LstOperations)
                .HasForeignKey(bc => bc.ManufacturingPlanId);
        }
    }
}