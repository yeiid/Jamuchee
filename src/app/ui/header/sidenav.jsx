
import NavLinks from './nav-links';
import Card from '@/app/ui/card/Card';
// import Image from 'next/image';

export default function SideNav() {


  return (
    <div className=" bg-gray-50 flex h-full flex-row items-center px-3 py-4 md:px-2">
            {/* <div className="hidden md:block">
        <Image
        className="w-40"
          src="/favicon.ico"
          alt="Logo"
          width={150}
          height={150}
        />
      </div> */}
      <div className="flex grow  justify-around space-x-2  md:space-x-0 ">
        <NavLinks />
        </div>
        <Card/>
      </div>
    // </div>
  );
}
