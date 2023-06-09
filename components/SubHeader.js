import React from 'react';
import { FiList, FiGrid } from 'react-icons/fi';

export default function SubHeader({ perPage, handlePerPage, handleDisplayMode, displayMode, genre }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-100 p-2 px-5 sm:px-28">
      {genre ? <h1 className="text-2xl font-bold ml-1">{genre}</h1> : <h1 className="text-2xl font-bold ml-1">Genre</h1>}
      <div className="flex justify-between items-center mt-2 sm:mt-0">
        <div className="mr-5">
          <span className="mr-2">Exibir:</span>
          <select
            value={perPage}
            onChange={handlePerPage}
            className="px-4 py-2 rounded-lg bg-transparent"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <span className="ml-2">por vez</span>
        </div>
        <div className="flex">
          <button
            onClick={() => handleDisplayMode('list')}
            className={`p-2 ml-2 rounded-lg ${displayMode === 'list' ? 'text-royalBlue' : ''}`}
          >
            <FiList />
          </button>
          <button
            onClick={() => handleDisplayMode('card')}
            className={`p-2 ml-2 rounded-lg ${displayMode === 'card' ? 'text-royalBlue' : ''}`}
          >
            <FiGrid />
          </button>
        </div>
      </div>
    </div>
  );
}
