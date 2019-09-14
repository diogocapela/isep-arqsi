using Factory.Domain;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.MachineTypeOperationAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.AggregatesModel.ProductionLineAggregate;
using Factory.Domain.AggregatesModel.ToolAggregate;
using Factory.Infrastructure.EntityConfigurations;
using Microsoft.EntityFrameworkCore;

namespace Factory.Infrastructure.Persistence
{
    public class FactoryContext : DbContext
    {
        public const string DEFAULT_SCHEMA = "factory";

        public FactoryContext(DbContextOptions<FactoryContext> options) : base(options)
        {
        }

        public DbSet<Machine> Machines { get; set; }
        public DbSet<MachineType> MachineTypes { get; set; }
        public DbSet<Operation> Operations { get; set; }
        public DbSet<ProductionLine> ProductionLines { get; set; }
        public DbSet<MachineTypeOperation> MachineTypeOperations { get; set; }
        public DbSet<Tool> Tools { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MachineConfiguration());
            modelBuilder.ApplyConfiguration(new MachineTypeConfiguration());
            modelBuilder.ApplyConfiguration(new OperationTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductionLineConfiguration());
            modelBuilder.ApplyConfiguration(new MachineTypeOperationConfiguration());
            
            modelBuilder.Entity<MachineTypeOperation>()
                .HasKey(mto => new { mto.OperationId, mto.MachineTypeId });  
            
            modelBuilder.Entity<MachineTypeOperation>()
                .HasOne(mto => mto.operation)
                .WithMany(b => b.MachineTypeOperations)
                .HasForeignKey(bc => bc.OperationId);  
            
            modelBuilder.Entity<MachineTypeOperation>()
                .HasOne(bc => bc.machinetype)
                .WithMany(c => c.machineTypeOperations)
                .HasForeignKey(bc => bc.MachineTypeId);
            
        }
    }
}