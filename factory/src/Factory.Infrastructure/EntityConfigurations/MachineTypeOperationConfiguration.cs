using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.MachineTypeOperationAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Factory.Infrastructure.EntityConfigurations
{

    public class MachineTypeOperationConfiguration : IEntityTypeConfiguration<MachineTypeOperation>
    {

        public void Configure(EntityTypeBuilder<MachineTypeOperation> builder)
        {
                
        }
    }

}