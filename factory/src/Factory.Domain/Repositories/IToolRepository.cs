using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.ToolAggregate;

namespace Factory.Domain.Repositories
{
    public interface IToolRepository
    {
        Task<Tool> GetByName(string name);
        Task<Tool> FirstOrDefault(Expression<Func<Tool, bool>> predicate);
        Task<Tool> Create(Tool entity);
        Task<Tool> Update(Tool entity);
        Task Delete(Tool entity);
        Task<IEnumerable<Tool>> GetAll(int skip, int take);
        Task<IEnumerable<Tool>> GetAll();
    }
}