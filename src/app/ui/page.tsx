"use client";
import React from "react";
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FeatureSection from '@/components/FeatureSection';
import TestimonialSection from '@/components/TestimonialSection';

const HomePage = () => {
  return (
    <div className="bg-green-50">
      <HeroSection />
      <CategorySection />
      <FeatureSection />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
