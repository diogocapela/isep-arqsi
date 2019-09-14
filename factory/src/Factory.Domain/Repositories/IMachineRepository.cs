using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineAggregate;

namespace Factory.Domain.Repositories
{
    public interface IMachineRepository
    {
        Task<Machine> GetById(int id);
        Task<Machine> FirstOrDefault(Expression<Func<Machine, bool>> predicate);
        Task<Machine> Create(Machine entity);
        Task<Machine> Update(Machine entity);
        Task Delete(Machine entity);
        Task<IEnumerable<Machine>> GetAll(int skip, int to);
        Task<IEnumerable<Machine>> GetAll();
        Task<Machine> GetByName(string name);
        Task<IEnumerable<Machine>> GetWhere(Expression<Func<Machine, bool>> predicate, int skip, int take);
    }
}