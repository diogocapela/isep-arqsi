using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Production.Domain.Repositories;
using Production.Domain.SeedWork;
using Production.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Production.Infrastructure.Repositories
{
    public class GenericRepository<T> : IAsyncRepository<T> where T : Entity
    {
        private readonly ProductionContext _context;

        public GenericRepository(ProductionContext context)
        {
            _context = context;
        }

        public Task<T> GetById(int id)
        {
            return _context.Set<T>().FindAsync(id);
        }

        public Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().FirstOrDefaultAsync(predicate);
        }

        public async Task<T> Create(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> Update(T entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;

        }

        public async Task Delete(T entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAll(int from, int take)
        {
            return await _context.Set<T>().Skip(from).Take(take).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate, int skip, int take)
        {
            return await _context.Set<T>().Where(predicate).Skip(skip).Take(take).ToListAsync();
        }
    }
}