function Navbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">

      <h2 className="text-2xl font-bold text-gray-800">
        Dashboard
      </h2>

      <button
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
      >
        Logout
      </button>

    </header>
  );
}

export default Navbar;