using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Production.Domain.SeedWork;

namespace Production.Domain.Repositories
{
    public interface IAsyncRepository<T> where T : Entity
    {
        Task<T> GetById(int id);
        Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate);

        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task Delete(T entity);

        Task<IEnumerable<T>> GetAll(int from, int to);
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate, int skip, int take);
    }
}