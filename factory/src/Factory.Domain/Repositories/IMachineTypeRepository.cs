using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;

namespace Factory.Domain.Repositories
{
    public interface IMachineTypeRepository
    {
        Task<MachineType> GetById(int id);
        Task<MachineType> FirstOrDefault(Expression<Func<MachineType, bool>> predicate);
        Task<MachineType> Create(MachineType entity);
        Task<MachineType> Update(MachineType entity);
        Task Delete(MachineType entity);
        Task<IEnumerable<MachineType>> GetAll(int skip, int take);
        Task<IEnumerable<MachineType>> GetAll();
        Task<IEnumerable<MachineType>> GetWhere(Expression<Func<MachineType, bool>> predicate, int skip, int take);
    }
}