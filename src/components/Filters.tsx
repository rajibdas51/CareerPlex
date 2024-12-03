import React from 'react';

const Filters = ({
  filters,
  setFilters,
  getData,
}: {
  filters: any;
  setFilters: any;
  getData: any;
}) => {
  return (
    <div className='flex  gap-3 my-3 items-center'>
      <div className='flex  gap-3 my-3 items-center'>
        <span>Search Jobs</span>
        <input
          type='text'
          value={filters.searchText}
          className='py-2 px-3 rounded-md border  border-gray-300 rounded px-3 py-2 focus:outline-none  focus:border-[#00ae94]'
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
        />
      </div>
      <div className='flex flex-row gap-3  items-center py-2 px-3 rounded-md '>
        <span>Location</span>
        <select
          value={filters.locaion}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className='py-2 px-3 rounded-md border border-gray-300 rounded px-3 py-3 focus:outline-none  focus:border-[#00ae94]'
        >
          <option
            value='bangladesh'
            className='focus:bg-[#00ae94] hover:bg-[#00ae94]'
          >
            Bangladesh
          </option>
          <option value='usa'>USA</option>
          <option value='germany'>Germany</option>
          <option value='netherlands'>Netherlands</option>
          <option value='india'>India</option>
        </select>
      </div>
      <button
        className='bg-[#00ae94] text-white py-2 px-4 rounded-md'
        onClick={getData}
      >
        Filter
      </button>
    </div>
  );
};

export default Filters;
