import Banner from './banner';

export default function Layout({ children }) {
  return (
    <div className="font-sans text-xl">
      <Banner />
      {children}
    </div>
  );
}
