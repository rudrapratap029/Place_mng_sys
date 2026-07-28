function Card({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <h3 className="text-gray-500 text-lg font-medium">
        {title}
      </h3>

      <h1 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h1>
    </div>
  );
}

export default Card;