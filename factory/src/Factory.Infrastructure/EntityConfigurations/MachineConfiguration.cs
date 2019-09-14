using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Factory.Infrastructure.EntityConfigurations
{
    public class MachineConfiguration : IEntityTypeConfiguration<Machine>
    {
        public void Configure(EntityTypeBuilder<Machine> machineConfiguration)
        {
            
            //machineConfiguration.ToTable("machines", FactoryContext.DEFAULT_SCHEMA);
            machineConfiguration.HasKey(o => o.Id);

            //machineConfiguration.Property(o => o.Id)
            //    .ForSqlServerUseSequenceHiLo("machinesSeq", FactoryContext.DEFAULT_SCHEMA);

            //machineConfiguration.Property(o => o.MachineName);
            //machineConfiguration.Property(o => o.Description);
            //machineConfiguration.HasOne(o => o.MachineType).WithMany().HasForeignKey(m => m.Id);
        }
    }
}