import React from "react";

function ListItem({ title, isCompleted,onChange }) {
  return (
    <div className="min-w-0 flex-1 text-sm leading-6">
      <div className="relative flex items-center p-4 justify-between">
        <label
          htmlFor="person-1"
          className={`select-none font-medium text-gray-900 ${+isCompleted === 1 && 'line-through'}`}
        >
          {title}
        </label>
        &nbsp;
        &nbsp;

        <input
          id="person-1"
          name="person-1"
          type="checkbox"
          checked={Number(isCompleted) === 1}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default React.memo(ListItem, (prevProps, newProps)=>{
  return prevProps.isCompleted === newProps.isCompleted
})