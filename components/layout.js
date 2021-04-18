import Banner from './banner';

export default function Layout({ children }) {
  return (
    <div class="font-display text-xl">
      <Banner />
      {children}
    </div>
  );
}
