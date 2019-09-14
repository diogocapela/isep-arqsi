using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.Repositories;
using Factory.Domain.SeedWork;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Factory.Infrastructure.Repositories
{
    public class GenericRepository<T> : IAsyncRepository<T> where T : Entity
    {
        private readonly FactoryContext _context;
        private const int DefaultTake = 50;

        public GenericRepository(FactoryContext context)
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

        public async Task<IEnumerable<T>> GetAll(int skip, int take)
        {
            return await _context.Set<T>().Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _context.Set<T>().Take(DefaultTake).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate, int skip, int take)
        {
            return await _context.Set<T>().Where(predicate).Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }
    }
}