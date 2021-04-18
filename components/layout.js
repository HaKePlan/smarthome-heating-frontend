import Banner from "./banner";

export default function Layout({ children }) {
  return <div class="font-sans text-xl"><Banner />{children}</div>;
}
