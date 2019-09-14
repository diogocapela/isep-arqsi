using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Factory.Domain.AggregatesModel.MachineAggregate;
using Factory.Domain.Repositories;
using Factory.Infrastructure.Persistence;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Factory.Infrastructure.Repositories
{
    public class MachineRepository : IMachineRepository
    {
        private readonly FactoryContext _context;
        private const int DefaultTake = 50;

        public MachineRepository(FactoryContext context)
        {
            _context = context;
        }
        
        public async Task<Machine> GetById(int id)
        {
            return await _context.Set<Machine>().Include(p=>p.MachineType).FirstAsync(i => i.Id == id);
        }

        public async Task<Machine> FirstOrDefault(Expression<Func<Machine, bool>> predicate)
        {
            return await _context.Set<Machine>().Include(p=>p.MachineType).FirstOrDefaultAsync(predicate);
        }

        public async Task<Machine> Create(Machine entity)
        {
            await _context.Set<Machine>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Machine> Update(Machine entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task Delete(Machine entity)
        {
            _context.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Machine>> GetAll(int skip, int take)
        {
            return await _context.Set<Machine>().Include(p=>p.MachineType).Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Machine>> GetAll()
        {
            return await _context.Set<Machine>().Include(p=>p.MachineType).Take(DefaultTake).AsNoTracking().ToListAsync();
        }

        public async Task<Machine> GetByName(string name)
        {
            return await _context.Set<Machine>().Include(p=>p.MachineType).FirstOrDefaultAsync(m => m.MachineName.Equals(name));
        }

        public async Task<IEnumerable<Machine>> GetWhere(Expression<Func<Machine, bool>> predicate, int skip, int take)
        {
            return await _context.Set<Machine>().Include(p=>p.MachineType).Where(predicate).Skip(skip).Take(take).AsNoTracking().ToListAsync();
        }
    }
}