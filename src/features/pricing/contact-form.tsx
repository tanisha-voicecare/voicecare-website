"use client";

import { useState } from "react";
import { FadeIn } from "@/components/motion";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { assets } from "@/lib/assets";
import Image from "next/image";

const locationOptions = [
  "Select number of locations",
  "1-10",
  "11-50",
  "51-250",
  "250+",
] as const;

const ehrOptions = [
  "Select EHR system",
  "Epic",
  "Athena Health",
  "Cerner",
  "CareStack",
  "Dentrix Ascend",
  "Open Dental",
  "Other",
] as const;

const inputClass =
  "w-full h-[56px] border border-transparent bg-white px-6 font-satoshi text-[16px] font-normal leading-[120%] text-black placeholder:text-black focus:border-[#FF4E3A] focus:outline-none focus:ring-1 focus:ring-[#FF4E3A]";

const selectClass =
  "w-full h-[56px] appearance-none border border-transparent bg-white px-6 font-satoshi text-[16px] font-normal leading-[120%] text-black focus:border-[#FF4E3A] focus:outline-none focus:ring-1 focus:ring-[#FF4E3A]";

const labelClass =
  "mb-3 block font-satoshi text-[16px] font-normal leading-[120%] text-black";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, string> | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const formData = new FormData(event.currentTarget);
    const fields = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
    );

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "schedule-demo", fields }),
      });
      const result = await response.json();
      
      if (response.ok) {
        setSubmittedData(fields);
        setIsSuccess(true);
      } else {
        setSubmitMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Construct pre-filled HubSpot URL
  const getPrefilledUrl = () => {
    const embedUrl = "https://meetings-na2.hubspot.com/parag-j/voicecare-ai-demo";
    let finalUrl = embedUrl + "?embed=true";
    
    if (submittedData) {
      const firstName = submittedData['first_name'] || '';
      const lastName = submittedData['last_name'] || '';
      const email = submittedData['email'] || '';
      const company = submittedData['company_name'] || '';
      
      if (email) {
        finalUrl += `&email=${encodeURIComponent(email)}`;
      }
      
      if (company) {
        finalUrl += `&company=${encodeURIComponent(company)}`;
      }
      
      if (firstName) {
        finalUrl += `&firstname=${encodeURIComponent(firstName)}&first_name=${encodeURIComponent(firstName)}&firstName=${encodeURIComponent(firstName)}`;
      }

      if (lastName) {
        finalUrl += `&lastname=${encodeURIComponent(lastName)}&last_name=${encodeURIComponent(lastName)}&lastName=${encodeURIComponent(lastName)}`;
      }
    }
    
    return finalUrl;
  };

  return (
    <SectionWrapper
      id="schedule-demo"
      className="bg-[#EFEBF2]"
      innerClassName="max-w-[1600px] px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 sm:py-20 lg:px-20 lg:py-28">
        {isSuccess ? (
          <FadeIn className="mx-auto w-full max-w-4xl">
            <div className="w-full bg-white min-h-[900px] overflow-visible rounded-xl shadow-lg border border-[#06003F]/10">
              <iframe
                src={getPrefilledUrl()}
                width="100%"
                height="1000"
                frameBorder="0"
                title="Schedule a Demo"
                className="w-full rounded-xl"
                style={{ minHeight: '1000px' }}
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setSubmittedData(null);
                }}
                className="font-satoshi text-[16px] font-medium text-[#FF4E3A] hover:underline transition-all"
              >
                Submit another response
              </button>
            </div>
          </FadeIn>
        ) : (
          <>
            {/* Heading row */}
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-32">
              <div className="flex flex-col justify-center">
                <FadeIn>
                  <h2 className="font-satoshi text-[40px] font-normal leading-[120%] text-black sm:text-[48px] lg:text-[60px]">
                    Schedule a Demo
                  </h2>
                </FadeIn>
              </div>
              <div className="flex flex-col justify-center">
                <FadeIn delay={0.1}>
                  <p className="max-w-[480px] font-satoshi text-[16px] font-light leading-[125%] text-black">
                    Spend less time managing software and more time growing your bottom
                    line. Fill out the form below to book a time with us and see exactly
                    how VoiceCare AI can transform your revenue cycle.
                  </p>
                </FadeIn>
              </div>
            </div>

            {/* Form */}
            <FadeIn delay={0.2} className="mt-16 lg:mt-[100px]">
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                {/* Row 1: First name + Last name */}
                <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
                  <div className="w-full max-w-[652px]">
                    <label htmlFor="first_name" className={labelClass}>
                      First Name*
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="Enter first name"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="w-full max-w-[652px]">
                    <label htmlFor="last_name" className={labelClass}>
                      Last Name*
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="Enter last name"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 2: Work email + Company Name */}
                <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
                  <div className="w-full max-w-[652px]">
                    <label htmlFor="email" className={labelClass}>
                      Work Email*
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter work email"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="w-full max-w-[652px]">
                    <label htmlFor="company_name" className={labelClass}>
                      Company / Practice Name*
                    </label>
                    <input
                      id="company_name"
                      name="company_name"
                      type="text"
                      placeholder="Enter company / practice name"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 3: Number of locations + Primary EHR */}
                <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
                  <div className="w-full max-w-[652px]">
                    <label htmlFor="locations" className={labelClass}>
                      Number of Locations*
                    </label>
                    <div className="relative">
                      <select
                        id="locations"
                        name="locations"
                        required
                        className={selectClass}
                      >
                        {locationOptions.map((opt) => (
                          <option key={opt} value={opt === locationOptions[0] ? "" : opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {/* Dropdown Icon */}
                      <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center">
                        <Image
                          src={assets.pricing.icons.dropdownChevron}
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full max-w-[652px]">
                    <label htmlFor="ehr_system" className={labelClass}>
                      Primary EHR System
                    </label>
                    <div className="relative">
                      <select id="ehr_system" name="ehr_system" className={selectClass}>
                        {ehrOptions.map((opt) => (
                          <option key={opt} value={opt === ehrOptions[0] ? "" : opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {/* Dropdown Icon */}
                      <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center">
                        <Image
                          src={assets.pricing.icons.dropdownChevron}
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 4: Date + Time + Submit */}
                <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
                  {/* Left column split in two for Date and Time */}
                  <div className="grid w-full max-w-[652px] grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="demo_date" className={labelClass}>
                        Date*
                      </label>
                      <div className="relative">
                    <input
                      id="demo_date"
                      name="demo_date"
                      type="date"
                      required
                      className={`${inputClass} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`}
                      style={{ color: "transparent" }}
                    />
                        <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center font-satoshi text-[16px] font-normal text-black">
                          Select date
                        </div>
                        {/* Calendar Icon */}
                        <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center">
                          <Image
                            src={assets.pricing.icons.calendar}
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5 object-contain"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="demo_time" className={labelClass}>
                        Time*
                      </label>
                      <div className="relative">
                    <input
                      id="demo_time"
                      name="demo_time"
                      type="time"
                      required
                      className={`${inputClass} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`}
                      style={{ color: "transparent" }}
                    />
                        <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center font-satoshi text-[16px] font-normal text-black">
                          Select time
                        </div>
                        {/* Clock Icon */}
                        <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center">
                          <Image
                            src={assets.pricing.icons.clock}
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5 object-contain"
                            unoptimized
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right column for Submit */}
                  <div className="flex w-full max-w-[652px] items-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{ background: "linear-gradient(106deg, #FF4E3A 2.52%, #02007F 79.8%)" }}
                      className="flex h-[56px] px-10 items-center justify-center font-satoshi text-[16px] font-normal text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending…" : "Submit"}
                    </button>
                  </div>
                </div>

                {submitMessage && (
                  <p className="text-sm text-black/60">{submitMessage}</p>
                )}
              </form>
            </FadeIn>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
