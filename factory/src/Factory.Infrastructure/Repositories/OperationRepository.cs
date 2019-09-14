using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineTypeAggregate;
using Factory.Domain.AggregatesModel.OperationAggregate;
using Factory.Domain.Repositories;
using Factory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Factory.Infrastructure.Repositories
{
    public class OperationRepository : IOperationRepository
    {
        private readonly FactoryContext _context;
        private const int DefaultTake = 50;
        
        public OperationRepository(FactoryContext context)
        {
            _context = context;
        }
        
        public async Task<Operation> GetById(int id)
        {
            return await _context.Set<Operation>().Include(o => o.Tool).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<Operation> FirstOrDefault(Expression<Func<Operation, bool>> predicate)
        {
            return await _context.Set<Operation>().Include(o => o.Tool).FirstOrDefaultAsync(predicate);
        }

        public async Task<Operation> Create(Operation entity)
        {
            await _context.Set<Operation>().AddAsync(entity);
            
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Operation> Update(Operation entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(Operation entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Operation>> GetAll(int skip, int take)
        {
            return await _context.Set<Operation>().Include(o => o.Tool).Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Operation>> GetAll()
        {
            return await _context.Set<Operation>().Include(o => o.Tool).Take(DefaultTake).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Operation>> GetWhere(Expression<Func<Operation, bool>> predicate, int skip, int take)
        {
            return await _context.Set<Operation>().Include(o => o.Tool).Where(predicate).Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }
    }
}