import Categories from "@/components/Categories";
import { Community } from "@/components/Community";
import { Contact } from "@/components/Contact";
import HeroSec from "@/components/HeroSec";
import Offers from "@/components/Offers";

export default function Home() {
  return (
    <main>
      <HeroSec />
      <Categories/>
      <Offers/>
      <Community/>
      <Contact/>
      {/* Other sections */}
    </main>
  );
}
