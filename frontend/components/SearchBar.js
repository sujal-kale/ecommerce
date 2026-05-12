export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search Products"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 rounded w-full"
    />
  );
}