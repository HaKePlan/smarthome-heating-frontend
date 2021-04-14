import Link from 'next/link';

export default function Banner({ children }) {
  return (
    <div>
      <div class="text-black bg-red-300">
        <Link href="/">
          <p class="uppercase font-bold p-2 pl-4  select-text">
            Heating station controll
          </p>
        </Link>
        <div class="flex flex-row">
          <div class="flex-1 text-center border-r-2 border-red-600">
            <Link href="/utilities/login">
              <p class="hover:underline text-red-700 font-bold select-text">
                Login
              </p>
            </Link>
          </div>
          <div class="flex-1 text-center border-r-2 border-red-600">
            <Link href="/domain/heizkreis1">
              <p class="hover:underline text-red-700 font-bold select-text">
                Heizkreis 1
              </p>
            </Link>
          </div>
          <div class="flex-1 text-center border-r-2 border-red-600">
            <Link href="/domains/Heizkreis_2">
              <p class="hover:underline text-red-700 font-bold select-text">
                Heizkreis 2
              </p>
            </Link>
          </div>
          <div class="flex-1 text-center">
            <Link href="/utilities/login2">
              <p class="hover:underline text-red-700 font-bold select-text">
                Login 2
              </p>
            </Link>
          </div>
          <div class="flex-1 text-center">
            <img class="absolute top-0 right-0" src="/aenergie_logo.png" />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
