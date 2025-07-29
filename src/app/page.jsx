import { Community } from "@/components/Community";
import { Contact } from "@/components/Contact";
import Category from "@/components/Category";
import HeroSec from "@/components/HeroSec";
import Offers from "@/components/Offers";

export default function Home() {
  return (
    <main>
      <HeroSec />
      <Category/>
      <Offers/>
      <Community/>
      <Contact/>
      {/* Other sections */}
    </main>
  );
}
