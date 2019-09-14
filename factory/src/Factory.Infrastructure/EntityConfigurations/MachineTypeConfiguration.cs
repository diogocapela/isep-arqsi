using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Factory.Infrastructure.EntityConfigurations
{
    public class MachineTypeConfiguration : IEntityTypeConfiguration<MachineType>
    {
        public void Configure(EntityTypeBuilder<MachineType> machineTypeConfiguration)
        {
            
            //machineTypeConfiguration.ToTable("machine_types", FactoryContext.DEFAULT_SCHEMA);

            machineTypeConfiguration.HasKey(o => o.Id);

            //machineTypeConfiguration.Property(o => o.Id)
            //    .ForSqlServerUseSequenceHiLo("machineTypesSeq", FactoryContext.DEFAULT_SCHEMA);
            //machineTypeConfiguration.Property(o => o.NameMachineType);
            //machineTypeConfiguration.Property(o => o.Description);
            
            
        }
    }
}