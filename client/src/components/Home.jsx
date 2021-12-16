import "./Home.css";
import Slide from "./HomePage/Slide";
import Card from "./HomePage/Card";
import Footer from "./HomePage/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import MiddleSlide from "./HomePage/MiddleSlide";

function Home() {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Darul Hikma | Home </title>
        </Helmet>
      </HelmetProvider>
      <Slide />
      <Card title={"ARABIC MAGAZINES"} view={"arabic"} url="ARABIC MAGAZINES" />
      <MiddleSlide image={"slide3.jpg"} />
      <Card
        title={"ENGLISH MAGAZINES"}
        view={"english"}
        url="ENGLISH MAGAZINES"
      />
      <MiddleSlide image={"slide2.jpg"} />
      <Card title={"JOURNALS"} view={"journals"} url="JOURNAL" />
      <Footer />
    </div>
  );
}

export default Home;
