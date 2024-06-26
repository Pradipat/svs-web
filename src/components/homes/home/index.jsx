import ScrollToTop from "@/hooks/scroll-to-top";
// import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import React from "react";
import AboutArea from "../../../common/about-area";
import FeatureArea from "./feature-area";
import HeroSlider from "./hero-slider";
import PriceArea from "./price-area";
import ProjectArea from "./project-area";
import RankArea from "./rank-area";
import ServicesArea from "./services-area";
import TestimonialArea from "./testimonial-area";
import Footer from "@/layout/footers/footer";
import PlatformArea from "@/common/platform-area";
import BlogArea from "./blog-area";
import HeaderSix from "@/layout/headers/header-6";
import HeaderTwo from "@/layout/headers/header-2";
import HeaderThree from "@/layout/headers/header-3";
import HeaderFour from "@/layout/headers/header-4";
import HeaderFive from "@/layout/headers/header-5";


const HomeOne = () => {
	return (
		<>
			<Header />
			<div id="smooth-wrapper">
				<div id="smooth-content">
					<main className="fix">
						<HeroSlider />
						<PlatformArea style_carrer={true} />
						
						
						{/* <AboutArea /> */}
						<ServicesArea />
						<ProjectArea />
						<FeatureArea />
						{/* <BlogArea />	 */}
						{/* <TestimonialArea /> */}
						{/* <RankArea /> */}
						{/* <PriceArea /> */}
					</main>
					<Footer />
					<ScrollToTop />
				</div>
			</div>
		</>
	);
};

export default HomeOne;
