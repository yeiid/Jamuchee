import Image from 'next/image'
import cart from '@/mook/datos.json'


const SpeciesCard = () => {
  return (
    <>
    <div className="flex flex-wrap justify-center m-4 ">
      { cart.map((a) => (
        <div
          key={a.id}
          className="max-w-sm rounded overflow-hidden shadow-lg m-4"
        >
          <Image
            src={a.image}
            alt={a.name}
            width={200}
            height={200}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{a.name}</div>
            <p className="text-gray-700 text-base">{a.description}</p>

          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default SpeciesCard
