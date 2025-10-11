import { FaArrowRight } from "react-icons/fa";


const FAQ = () => {
    return (
        <div className="py-20 max-w-11/12 mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-[#03373D]">
                    Frequently Asked Question (FAQ)
                </h2>
                <p className="text-[#606060] mt-4 max-w-xl mx-auto">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!!
                </p>
            </div>
            <div className="mb-4 collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-base text-[#03373D] font-bold ">How does this posture corrector work?</div>
                <div className="collapse-content text-sm text-[#606060]">A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine. It encourages proper posture throughout the day by helping your muscles maintain natural alignment.</div>
            </div>
            <div className=" mb-4 collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base text-[#03373D] font-bold">Is it suitable for all ages and body types?</div>
                <div className="collapse-content text-sm text-[#606060]">Yes, most posture correctors are adjustable and can fit a wide range of body types. Always check the product sizing guide before purchase.</div>
            </div>
            <div className="mb-4 collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base text-[#03373D] font-bold">Does it really help with back pain and posture improvement?</div>
                <div className="collapse-content text-sm text-[#606060]">Regular use of a posture corrector can help relieve mild back pain and improve posture by retraining your muscles to align properly.</div>
            </div>
            <div className="mb-4 collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base text-[#03373D] font-bold">Does it have smart features like vibration alerts?</div>
                <div className="collapse-content text-sm text-[#606060]">Some models include vibration reminders that alert you when you slouch, providing gentle guidance toward better posture habits.</div>
            </div>
            <div className="mb-4 collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-base text-[#03373D] font-bold">How will I be notified when the product is back in stock?</div>
                <div className="collapse-content text-sm text-[#606060]">You can subscribe to stock notifications on our website. We’ll notify you via email as soon as the product becomes available again.</div>
            </div>
            <div className="text-center flex justify-center items-center">
                <button className="rounded-xl bg-[#CAEB66] text-[#1F1F1F] font-bold text-xl py-4 px-8">See More FAQ's</button>
                <span className="w-14 h-14 bg-[#1F1F1F] rounded-full flex justify-center items-center"><FaArrowRight className="text-[#CAEB66] text-xl -rotate-45" /></span>
            </div>
        </div>
    );
};

export default FAQ;