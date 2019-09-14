using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.MachineTypeOperationAggregate;

namespace Factory.Domain.Repositories
{
    public interface IMachineTypeOperationRepository
    {
        Task<MachineTypeOperation> GetById(int machineTypeId, int operationId);
        Task<MachineTypeOperation> FirstOrDefault(Expression<Func<MachineTypeOperation, bool>> predicate);
        Task<MachineTypeOperation> Create(MachineTypeOperation entity);
        
        Task<MachineTypeOperation> Update(MachineTypeOperation entity);
        void Delete( MachineTypeOperation entity);
        Task<IEnumerable<MachineTypeOperation>> GetAll(int skip, int take);
        Task<IEnumerable<MachineTypeOperation>> GetAll();
        Task<IEnumerable<MachineTypeOperation>> GetWhere(Expression<Func<MachineTypeOperation, bool>> predicate, int skip, int take);
    }
}