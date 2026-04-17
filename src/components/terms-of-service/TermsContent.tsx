/**
 * TermsContent Component
 * Dynamic content from WordPress + PIXEL-PERFECT design
 */

import type { TermsSectionContent } from '@/lib/content';

interface TermsContentProps {
  sections?: TermsSectionContent[];
}

// If WordPress provides sections, render them dynamically
// Otherwise, render the default hardcoded content
export function TermsContent({ sections }: TermsContentProps) {
  // If sections are provided from WordPress, render dynamically
  if (sections && sections.length > 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-7 md:space-y-8 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">
                {section.title}
              </h2>
              <div 
                className="terms-content text-muted-foreground [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:sm:pl-5 [&>ul]:md:pl-6 [&>ul]:space-y-1.5 [&>ul]:sm:space-y-2 [&>ul]:text-muted-foreground [&>ul]:mb-4 [&_.font-semibold]:font-semibold [&>a]:hover:underline"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
              {section.subsections?.map((sub, subIndex) => (
                <div key={subIndex} className="mt-4">
                  <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">
                    {sub.title}
                  </h3>
                  <div 
                    className="terms-content text-muted-foreground [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:sm:pl-5 [&>ul]:md:pl-6 [&>ul]:space-y-1.5 [&>ul]:sm:space-y-2 [&>ul]:text-muted-foreground [&>ul]:mb-4 [&>a]:hover:underline"
                    dangerouslySetInnerHTML={{ __html: sub.content }}
                  />
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    );
  }

  // Default fallback - original hardcoded content
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-7 md:space-y-8 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
        {/* Welcome */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Welcome to Voicecare!</h2>
          <p className="text-muted-foreground mb-4">
            Voicecare Technologies, Inc., Inc. (&quot;Voicecare,&quot; &quot;Voicecare Technologies, Inc.,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;) provides its services (described below) to you through its website located at www.voicecare.ai (the &quot;Site&quot;) and through its mobile applications and related services (collectively, such services, including any new features and applications, and the Site, the &quot;Service(s)&quot;), subject to the following Terms of Service (as amended from time to time, the &quot;Terms of Service&quot;). We reserve the right, at our sole discretion, to change or modify portions of these Terms of Service at any time. If we do this, we will post the changes on this page and will indicate at the top of this page the date these terms were last revised. We will also notify you, either through the Services user interface, in an email notification or through other reasonable means. Any such changes will become effective no earlier than fourteen (14) days after they are posted, except that changes addressing new functions of the Services or changes made for legal reasons will be effective immediately. Your continued use of the Service after the date any such changes become effective constitutes your acceptance of the new Terms of Service.
          </p>
          <p className="text-muted-foreground mb-4 font-semibold">
            PLEASE READ THESE TERMS OF SERVICE CAREFULLY, AS THEY CONTAIN AN AGREEMENT TO ARBITRATE AND OTHER IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS. THE AGREEMENT TO ARBITRATE REQUIRES (WITH LIMITED EXCEPTION) THAT YOU SUBMIT CLAIMS YOU HAVE AGAINST US TO BINDING AND FINAL ARBITRATION, AND FURTHER (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AGAINST VOICECARE ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING, (2) YOU WILL ONLY BE PERMITTED TO SEEK RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ON AN INDIVIDUAL BASIS, AND (3) YOU MAY NOT BE ABLE TO HAVE ANY CLAIMS YOU HAVE AGAINST US RESOLVED BY A JURY OR IN A COURT OF LAW.
          </p>
          <p className="text-muted-foreground mb-4">
            If you are entering into these Terms of Service on behalf of a company, business or other legal entity, you represent that you have the authority to bind such entity and its affiliates to these Terms of Service, in which case the terms &quot;User&quot;, &quot;you&quot; or &quot;your&quot; shall refer to such entity and its affiliates. If you do not have such authority, or if you do not agree with these Terms of Services, you must not accept these Terms of Services and may not use the Services.
          </p>
          <p className="text-muted-foreground">
            In addition, when using certain services, you will be subject to any additional terms applicable to such services that may be posted on the Service from time to time, including, without limitation, the Privacy Policy located at{' '}
            <a href="https://voicecare.ai/privacy-policy/" className="hover:underline" target="_blank" rel="noopener noreferrer">
              https://voicecare.ai/privacy-policy/
            </a>
            . All such terms are hereby incorporated by reference into these Terms of Service.
          </p>
        </section>

        {/* Access and Use of the Service */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Access and Use of the Service</h2>
          
          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Services Description:</h3>
          <p className="text-muted-foreground mb-4">
            The Service is designed to provide you logistics, shipment, fulfillment and related services through the Voicecare software-as-a-service platform.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Your Registration Obligations:</h3>
          <p className="text-muted-foreground mb-4">
            You may be required to register with Voicecare in order to access and use certain features of the Service. If you choose to register for the Service, you agree to provide and maintain true, accurate, current and complete information about yourself as prompted by the Service&apos;s registration form. Registration data and certain other information about you are governed by our Privacy Policy. If you are under 13 years of age, you are not authorized to use the Service, with or without registering. In addition, if you are under 18 years old, you may use the Service, with or without registering, only with the approval of your parent or guardian.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Member Account, Password and Security:</h3>
          <p className="text-muted-foreground mb-4">
            You are responsible for maintaining the confidentiality of your password and account, if any, and are fully responsible for any and all activities that occur under your password or account. You agree to (a) immediately notify Voicecare of any unauthorized use of your password or account or any other breach of security, and (b) ensure that you exit from your account at the end of each session when accessing the Service. Voicecare will not be liable for any loss or damage arising from your failure to comply with this Section.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Modifications to Service:</h3>
          <p className="text-muted-foreground mb-4">
            Voicecare reserves the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Voicecare will not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">General Practices Regarding Use and Storage:</h3>
          <p className="text-muted-foreground">
            You acknowledge that Voicecare may establish general practices and limits concerning use of the Service, including without limitation the maximum period of time that data or other content will be retained by the Service and the maximum storage space that will be allotted on Voicecare&apos;s servers on your behalf. You agree that Voicecare has no responsibility or liability for the deletion or failure to store any data or other content maintained or uploaded by the Service. You acknowledge that Voicecare reserves the right to terminate accounts that are inactive for an extended period of time. You further acknowledge that Voicecare reserves the right to change these general practices and limits at any time, in its sole discretion, with or without notice.
          </p>
        </section>

        {/* Conditions of Use */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Conditions of Use</h2>
          
          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">User Conduct:</h3>
          <p className="text-muted-foreground mb-4">
            You are solely responsible for all code, video, images, information, data, text, software, music, sound, photographs, graphics, messages or other materials (&quot;content&quot;) that you upload, post, publish or display (hereinafter, &quot;upload&quot;) or email or otherwise use via the Service. The following are examples of the kind of content and/or use that is illegal or prohibited by Voicecare. Voicecare reserves the right to investigate and take appropriate legal action against anyone who, in Voicecare&apos;s sole discretion, violates this provision, including without limitation, removing the offending content from the Service, suspending or terminating the account of such violators and reporting you to the law enforcement authorities. You agree to not use the Service to:
          </p>
          <ul className="list-disc pl-4 sm:pl-5 md:pl-6 space-y-1.5 sm:space-y-2 text-muted-foreground mb-4">
            <li>email or otherwise upload any content that (i) infringes any intellectual property or other proprietary rights of any party; (ii) you do not have a right to upload under any law or under contractual or fiduciary relationships; (iii) contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment; (iv) poses or creates a privacy or security risk to any person; (v) constitutes unsolicited or unauthorized advertising, promotional materials, commercial activities and/or sales, &quot;junk mail,&quot; &quot;spam,&quot; &quot;chain letters,&quot; &quot;pyramid schemes,&quot; &quot;contests,&quot; &quot;sweepstakes,&quot; or any other form of solicitation; (vi) is unlawful, harmful, threatening, abusive, harassing, tortious, excessively violent, defamatory, vulgar, obscene, pornographic, libelous, invasive of another&apos;s privacy, hateful racially, ethnically or otherwise objectionable; or (vii) in the sole judgment of Voicecare, is objectionable or which restricts or inhibits any other person from using or enjoying the Service, or which may expose Voicecare or its users to any harm or liability of any type;</li>
            <li>interfere with or disrupt the Service or servers or networks connected to the Service, or disobey any requirements, procedures, policies or regulations of networks connected to the Service; or</li>
            <li>violate any applicable local, state, national or international law, or any regulations having the force of law;</li>
            <li>impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity;</li>
            <li>solicit personal information from anyone under the age of 18;</li>
            <li>harvest or collect email addresses or other contact information of other users from the Service by electronic or other means for the purposes of sending unsolicited emails or other unsolicited communications;</li>
            <li>advertise or offer to sell or buy any goods or services for any business purpose that is not specifically authorized;</li>
            <li>further or promote any criminal activity or enterprise or provide instructional information about illegal activities; or</li>
            <li>obtain or attempt to access or otherwise obtain any materials or information through any means not intentionally made available or provided for through the Service.</li>
          </ul>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Fees:</h3>
          <p className="text-muted-foreground mb-4">
            To the extent the Service or any portion thereof is made available for any fee, you will be required to select a payment plan and provide Voicecare information regarding your credit card or other payment instrument. You represent and warrant to Voicecare that such information is true and that you are authorized to use the payment instrument. You will promptly update your account information with any changes (for example, a change in your billing address or credit card expiration date) that may occur. You agree to pay Voicecare the amount that is specified in the payment plan in accordance with the terms of such plan and this Terms of Service. We reserve the right to change Voicecare&apos;s prices. If Voicecare does change prices, Voicecare will provide notice of the change on the Site or in email to you, at Voicecare&apos;s option, at least 30 days before the change is to take effect. Your continued use of the Service after the price change becomes effective constitutes your agreement to pay the changed amount. Voicecare may choose to bill through an invoice, in which case, full payment for invoices issued in any given month must be received by Voicecare thirty (30) days after the mailing date of the invoice, or the Services may be terminated. Unpaid invoices are subject to a finance charge of 1.5% per month on any outstanding balance, or the maximum permitted by law, whichever is lower, plus all expenses of collection. You shall be responsible for all taxes associated with the Services other than U.S. taxes based on Voicecare&apos;s net income.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Special Notice for International Use; Export Controls:</h3>
          <p className="text-muted-foreground mb-4">
            Software (defined below) available in connection with the Service and the transmission of applicable data, if any, is subject to United States export controls. No Software may be downloaded from the Service or otherwise exported or re-exported in violation of U.S. export laws. Downloading or using the Software is at your sole risk. Recognizing the global nature of the Internet, you agree to comply with all local rules and laws regarding your use of the Service, including as it concerns online conduct and acceptable content.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Commercial Use:</h3>
          <p className="text-muted-foreground">
            Unless otherwise expressly authorized herein or in the Service, you agree not to display, distribute, license, perform, publish, reproduce, duplicate, copy, create derivative works from, modify, sell, resell, exploit, transfer or upload for any commercial purposes, any portion of the Service, use of the Service, or access to the Service.
          </p>
        </section>

        {/* Intellectual Property Rights */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Intellectual Property Rights</h2>
          
          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Service Content, Software and Trademarks:</h3>
          <p className="text-muted-foreground mb-4">
            You acknowledge and agree that the Service may contain content or features (&quot;Service Content&quot;) that are protected by copyright, patent, trademark, trade secret or other proprietary rights and laws. Except as expressly authorized by Voicecare, you agree not to modify, copy, frame, scrape, rent, lease, loan, sell, distribute or create derivative works based on the Service or the Service Content, in whole or in part, except that the foregoing does not apply to your own User Content (as defined below) that you legally upload to the Service. In connection with your use of the Service you will not engage in or use any data mining, robots, scraping or similar data gathering or extraction methods. If you are blocked by Voicecare from accessing the Service (including by blocking your IP address), you agree not to implement any measures to circumvent such blocking (e.g., by masking your IP address or using a proxy IP address). Any use of the Service or the Service Content other than as specifically authorized herein is strictly prohibited. The technology and software underlying the Service or distributed in connection therewith are the property of Voicecare, our affiliates and our partners (the &quot;Software&quot;). You agree not to copy, modify, create a derivative work of, reverse engineer, reverse assemble or otherwise attempt to discover any source code, sell, assign, sublicense, or otherwise transfer any right in the Software. Any rights not expressly granted herein are reserved by Voicecare.
          </p>
          <p className="text-muted-foreground mb-4">
            The Voicecare name and logos are trademarks and service marks of Voicecare (collectively the &quot;Voicecare Trademarks&quot;). Other company, product, and service names and logos used and displayed via the Service may be trademarks or service marks of their respective owners who may or may not endorse or be affiliated with or connected to Voicecare. Nothing in this Terms of Service or the Service should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any of Voicecare Trademarks displayed on the Service, without our prior written permission in each instance. All goodwill generated from the use of Voicecare Trademarks will inure to our exclusive benefit.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Third Party Material:</h3>
          <p className="text-muted-foreground mb-4">
            Under no circumstances will Voicecare be liable in any way for any content or materials of any third parties (including users), including, but not limited to, for any errors or omissions in any content, or for any loss or damage of any kind incurred as a result of the use of any such content. You acknowledge that Voicecare does not pre-screen content, but that Voicecare and its designees will have the right (but not the obligation) in their sole discretion to refuse or remove any content that is available via the Service. Without limiting the foregoing, Voicecare and its designees will have the right to remove any content that violates these Terms of Service or is deemed by Voicecare, in its sole discretion, to be otherwise objectionable. You agree that you must evaluate, and bear all risks associated with, the use of any content, including any reliance on the accuracy, completeness, or usefulness of such content.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">User Content Transmitted Through the Service:</h3>
          <p className="text-muted-foreground mb-4">
            With respect to the content or other materials you upload through the Service or share with other users or recipients (collectively, &quot;User Content&quot;), you represent and warrant that you own all right, title and interest in and to such User Content, including, without limitation, all copyrights and rights of publicity contained therein. By uploading any User Content you hereby grant and will grant Voicecare and its affiliated companies a nonexclusive, worldwide, royalty free, fully paid up, transferable, sublicensable, perpetual, irrevocable license to copy, display, upload, perform, distribute, store, modify and otherwise use your User Content in connection with the operation of the Service or the promotion, advertising or marketing thereof, in any form, medium or technology now known or later developed.
          </p>
          <p className="text-muted-foreground mb-4">
            You acknowledge and agree that any questions, comments, suggestions, ideas, feedback or other information about the Service (&quot;Submissions&quot;), provided by you to Voicecare are non-confidential and Voicecare will be entitled to the unrestricted use and dissemination of these Submissions for any purpose, commercial or otherwise, without acknowledgment or compensation to you.
          </p>
          <p className="text-muted-foreground">
            You acknowledge and agree that Voicecare may preserve content and may also disclose content if required to do so by law or in the good faith belief that such preservation or disclosure is reasonably necessary to: (a) comply with legal process, applicable laws or government requests; (b) enforce these Terms of Service; (c) respond to claims that any content violates the rights of third parties; or (d) protect the rights, property, or personal safety of Voicecare, its users and the public. You understand that the technical processing and transmission of the Service, including your content, may involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
          </p>
        </section>

        {/* Copyright Complaints */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Copyright Complaints</h2>
          <p className="text-muted-foreground mb-4">
            Voicecare respects the intellectual property of others, and we ask our users to do the same. If you believe that your work has been copied in a way that constitutes copyright infringement, or that your intellectual property rights have been otherwise violated, you should notify Voicecare of your infringement claim in accordance with the procedure set forth below.
          </p>
          <p className="text-muted-foreground mb-4">
            Voicecare will process and investigate notices of alleged infringement and will take appropriate actions under the Digital Millennium Copyright Act (&quot;DMCA&quot;) and other applicable intellectual property laws with respect to any alleged or actual infringement. A notification of claimed copyright infringement should be emailed to Voicecare&apos;s Copyright Agent at{' '}
            <a href="mailto:security@voicecare.ai" className="hover:underline">
              security@voicecare.ai
            </a>
            {' '}(Subject line: &quot;DMCA Takedown Request&quot;). You may also contact us by mail or facsimile at:
          </p>
          <p className="text-muted-foreground mb-4">
            Voicecare Technologies, Inc.<br />
            3816 Adriatic Way<br />
            San Bruno, CA 94066
          </p>
          <p className="text-muted-foreground mb-4">
            To be effective, the notification must be in writing and contain the following information:
          </p>
          <ul className="list-disc pl-4 sm:pl-5 md:pl-6 space-y-1.5 sm:space-y-2 text-muted-foreground mb-4">
            <li>an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright or other intellectual property interest;</li>
            <li>a description of the copyrighted work or other intellectual property that you claim has been infringed;</li>
            <li>a description of where the material that you claim is infringing is located on the Service, with enough detail that we may find it on the Service;</li>
            <li>your address, telephone number, and email address;</li>
            <li>a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright or intellectual property owner, its agent, or the law;</li>
            <li>a statement by you, made under penalty of perjury, that the above information in your Notice is accurate and that you are the copyright or intellectual property owner or authorized to act on the copyright or intellectual property owner&apos;s behalf.</li>
          </ul>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Counter-Notice:</h3>
          <p className="text-muted-foreground mb-4">
            If you believe that your User Content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner&apos;s agent, or pursuant to the law, to upload and use the content in your User Content, you may send a written counter-notice containing the following information to the Copyright Agent:
          </p>
          <ul className="list-disc pl-4 sm:pl-5 md:pl-6 space-y-1.5 sm:space-y-2 text-muted-foreground mb-4">
            <li>your physical or electronic signature;</li>
            <li>identification of the content that has been removed or to which access has been disabled and the location at which the content appeared before it was removed or disabled;</li>
            <li>a statement that you have a good faith belief that the content was removed or disabled as a result of mistake or a misidentification of the content; and</li>
            <li>your name, address, telephone number, and email address, a statement that you consent to the jurisdiction of the federal court located within Northern District of California and a statement that you will accept service of process from the person who provided notification of the alleged infringement.</li>
          </ul>
          <p className="text-muted-foreground mb-4">
            If a counter-notice is received by the Copyright Agent, Voicecare will send a copy of the counter-notice to the original complaining party informing that person that it may replace the removed content or cease disabling it in 10 business days. Unless the copyright owner files an action seeking a court order against the content provider, member or user, the removed content may be replaced, or access to it restored, in 10 to 14 business days or more after receipt of the counter-notice, at our sole discretion.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Repeat Infringer Policy:</h3>
          <p className="text-muted-foreground">
            In accordance with the DMCA and other applicable law, Voicecare has adopted a policy of terminating, in appropriate circumstances and at Voicecare&apos;s sole discretion, users who are deemed to be repeat infringers. Voicecare may also at its sole discretion limit access to the Service and/or terminate the memberships of any users who infringe any intellectual property rights of others, whether or not there is any repeat infringement.
          </p>
        </section>

        {/* Third Party Websites */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Third Party Websites</h2>
          <p className="text-muted-foreground">
            The Service may provide, or third parties may provide, links or other access to other sites and resources on the Internet. Voicecare has no control over such sites and resources and Voicecare is not responsible for and does not endorse such sites and resources. You further acknowledge and agree that Voicecare will not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any content, events, goods or services available on or through any such site or resource. Any dealings you have with third parties found while using the Service are between you and the third party, and you agree that Voicecare is not liable for any loss or claim that you may have against any such third party.
          </p>
        </section>

        {/* Indemnity and Release */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Indemnity and Release</h2>
          <p className="text-muted-foreground">
            You agree to release, indemnify and hold Voicecare and its affiliates and their officers, employees, directors and agents (collectively, &quot;Indemnitees&quot;) harmless from any from any and all losses, damages, expenses, including reasonable attorneys&apos; fees, rights, claims, actions of any kind and injury (including death) arising out of or relating to your use of the Service, any User Content, your connection to the Service, your violation of these Terms of Service or your violation of any rights of another. Notwithstanding the foregoing, you will have no obligation to indemnify or hold harmless any Indemnitee from or against any liability, losses, damages or expenses incurred as a result of any action or inaction of such Indemnitee. If you are a California resident, you waive California Civil Code Section 1542, which says: &quot;A general release does not extend to claims which the creditor does not know or suspect to exist in his favor at the time of executing the release, which if known by him must have materially affected his settlement with the debtor.&quot; If you are a resident of another jurisdiction, you waive any comparable statute or doctrine.
          </p>
        </section>

        {/* Disclaimer of Warranties */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Disclaimer of Warranties</h2>
          <p className="text-muted-foreground mb-4 font-semibold">
            YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. VOICECARE EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.
          </p>
          <p className="text-muted-foreground font-semibold">
            VOICECARE MAKES NO WARRANTY THAT (I) THE SERVICE WILL MEET YOUR REQUIREMENTS, (II) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Limitation of Liability</h2>
          <p className="text-muted-foreground mb-4 font-semibold">
            YOU EXPRESSLY UNDERSTAND AND AGREE THAT VOICECARE WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY DAMAGES, OR DAMAGES FOR LOSS OF PROFITS INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES (EVEN IF VOICECARE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, RESULTING FROM: (I) THE USE OR THE INABILITY TO USE THE SERVICE; (II) THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY GOODS, DATA, INFORMATION OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH OR FROM THE SERVICE; (III) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; (IV) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE; OR (V) ANY OTHER MATTER RELATING TO THE SERVICE. IN NO EVENT WILL VOICECARE&apos;S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES OR CAUSES OF ACTION EXCEED THE AMOUNT YOU HAVE PAID VOICECARE IN THE LAST SIX (6) MONTHS, OR, IF GREATER, ONE HUNDRED DOLLARS ($100).
          </p>
          <p className="text-muted-foreground mb-4">
            SOME JURISDICTIONS DO NOT ALLOW THE DISCLAIMER OR EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS SET FORTH ABOVE MAY NOT APPLY TO YOU OR BE ENFORCEABLE WITH RESPECT TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SERVICE OR WITH THESE TERMS OF SERVICE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USE OF THE SERVICE.
          </p>
          <p className="text-muted-foreground">
            IF YOU ARE A USER FROM NEW JERSEY, THE FOREGOING SECTIONS TITLED &quot;DISCLAIMER OF WARRANTIES&quot; AND &quot;LIMITATION OF LIABILITY&quot; ARE INTENDED TO BE ONLY AS BROAD AS IS PERMITTED UNDER THE LAWS OF THE STATE OF NEW JERSEY. IF ANY PORTION OF THESE SECTIONS IS HELD TO BE INVALID UNDER THE LAWS OF THE STATE OF NEW JERSEY, THE INVALIDITY OF SUCH PORTION SHALL NOT AFFECT THE VALIDITY OF THE REMAINING PORTIONS OF THE APPLICABLE SECTIONS.
          </p>
        </section>

        {/* Dispute Resolution By Binding Arbitration */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Dispute Resolution By Binding Arbitration: PLEASE READ THIS SECTION CAREFULLY AS IT AFFECTS YOUR RIGHTS.</h2>
          
          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Agreement to Arbitrate</h3>
          <p className="text-muted-foreground mb-4">
            This Dispute Resolution by Binding Arbitration section is referred to in this Terms of Service as the &quot;Arbitration Agreement.&quot; You agree that any and all disputes or claims that have arisen or may arise between you and Voicecare, whether arising out of or relating to this Terms of Service (including any alleged breach thereof), the Services, any advertising, any aspect of the relationship or transactions between us, shall be resolved exclusively through final and binding arbitration, rather than a court, in accordance with the terms of this Arbitration Agreement, except that you may assert individual claims in small claims court, if your claims qualify. Further, this Arbitration Agreement does not preclude you from bringing issues to the attention of federal, state, or local agencies, and such agencies can, if the law allows, seek relief against us on your behalf. You agree that, by entering into this Terms of Service, you and Voicecare are each waiving the right to a trial by jury or to participate in a class action. Your rights will be determined by a neutral arbitrator, not a judge or jury. The Federal Arbitration Act governs the interpretation and enforcement of this Arbitration Agreement.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Prohibition of Class and Representative Actions and Non-Individualized Relief</h3>
          <p className="text-muted-foreground mb-4 font-semibold">
            YOU AND VOICECARE AGREE THAT EACH OF US MAY BRING CLAIMS AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE ACTION OR PROCEEDING. UNLESS BOTH YOU AND VOICECARE AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE OR JOIN MORE THAN ONE PERSON&apos;S OR PARTY&apos;S CLAIMS AND MAY NOT OTHERWISE PRESIDE OVER ANY FORM OF A CONSOLIDATED, REPRESENTATIVE, OR CLASS PROCEEDING. ALSO, THE ARBITRATOR MAY AWARD RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ONLY IN FAVOR OF THE INDIVIDUAL PARTY SEEKING RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE RELIEF NECESSITATED BY THAT PARTY&apos;S INDIVIDUAL CLAIM(S), EXCEPT THAT YOU MAY PURSUE A CLAIM FOR AND THE ARBITRATOR MAY AWARD PUBLIC INJUNCTIVE RELIEF UNDER APPLICABLE LAW TO THE EXTENT REQUIRED FOR THE ENFORCEABILITY OF THIS PROVISION.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Pre-Arbitration Dispute Resolution</h3>
          <p className="text-muted-foreground mb-4">
            Voicecare is always interested in resolving disputes amicably and efficiently, and most customer concerns can be resolved quickly and to the customer&apos;s satisfaction by emailing customer support at{' '}
            <a href="mailto:security@voicecare.ai" className="hover:underline">
              security@voicecare.ai
            </a>
            . If such efforts prove unsuccessful, a party who intends to seek arbitration must first send to the other, by certified mail, a written Notice of Dispute (&quot;Notice&quot;). The Notice to Voicecare should be sent to Voicecare Technologies, Inc., Inc. 3816 Adriatic Way, San Bruno, CA 94066 (&quot;Notice Address&quot;). The Notice must (i) describe the nature and basis of the claim or dispute and (ii) set forth the specific relief sought. If Voicecare and you do not resolve the claim within sixty (60) calendar days after the Notice is received, you or Voicecare may commence an arbitration proceeding. During the arbitration, the amount of any settlement offer made by Voicecare or you shall not be disclosed to the arbitrator until after the arbitrator determines the amount, if any, to which you or Voicecare is entitled.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Arbitration Procedures</h3>
          <p className="text-muted-foreground mb-4">
            Arbitration will be conducted by a neutral arbitrator in accordance with the American Arbitration Association&apos;s (&quot;AAA&quot;) rules and procedures, including the AAA&apos;s Consumer Arbitration Rules (collectively, the &quot;AAA Rules&quot;), as modified by this Arbitration Agreement. For information on the AAA, please visit its website,{' '}
            <a href="http://www.adr.org" className="hover:underline" target="_blank" rel="noopener noreferrer">
              http://www.adr.org
            </a>
            . Information about the AAA Rules and fees for consumer disputes can be found at the AAA&apos;s consumer arbitration page,{' '}
            <a href="http://www.adr.org/consumer_arbitration" className="hover:underline" target="_blank" rel="noopener noreferrer">
              http://www.adr.org/consumer_arbitration
            </a>
            . If there is any inconsistency between any term of the AAA Rules and any term of this Arbitration Agreement, the applicable terms of this Arbitration Agreement will control unless the arbitrator determines that the application of the inconsistent Arbitration Agreement terms would not result in a fundamentally fair arbitration. The arbitrator must also follow the provisions of these Terms of Service as a court would. All issues are for the arbitrator to decide, including, but not limited to, issues relating to the scope, enforceability, and arbitrability of this Arbitration Agreement. Although arbitration proceedings are usually simpler and more streamlined than trials and other judicial proceedings, the arbitrator can award the same damages and relief on an individual basis that a court can award to an individual under the Terms of Service and applicable law. Decisions by the arbitrator are enforceable in court and may be overturned by a court only for very limited reasons.
          </p>
          <p className="text-muted-foreground mb-4">
            Unless Voicecare and you agree otherwise, any arbitration hearings will take place in a reasonably convenient location for both parties with due consideration of their ability to travel and other pertinent circumstances. If the parties are unable to agree on a location, the determination shall be made by AAA. If your claim is for $10,000 or less, Voicecare agrees that you may choose whether the arbitration will be conducted solely on the basis of documents submitted to the arbitrator, through a telephonic hearing, or by an in-person hearing as established by the AAA Rules. If your claim exceeds $10,000, the right to a hearing will be determined by the AAA Rules. Regardless of the manner in which the arbitration is conducted, the arbitrator shall issue a reasoned written decision sufficient to explain the essential findings and conclusions on which the award is based.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Costs of Arbitration</h3>
          <p className="text-muted-foreground mb-4">
            Payment of all filing, administration, and arbitrator fees (collectively, the &quot;Arbitration Fees&quot;) will be governed by the AAA Rules, unless otherwise provided in this Arbitration Agreement. If the value of the relief sought is $75,000 or less, at your request, Voicecare will pay all Arbitration Fees. If the value of relief sought is more than $75,000 and you are able to demonstrate to the arbitrator that you are economically unable to pay your portion of the Arbitration Fees or if the arbitrator otherwise determines for any reason that you should not be required to pay your portion of the Arbitration Fees, Voicecare will pay your portion of such fees. In addition, if you demonstrate to the arbitrator that the costs of arbitration will be prohibitive as compared to the costs of litigation, Voicecare will pay as much of the Arbitration Fees as the arbitrator deems necessary to prevent the arbitration from being cost-prohibitive. Any payment of attorneys&apos; fees will be governed by the AAA Rules.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Confidentiality</h3>
          <p className="text-muted-foreground mb-4">
            All aspects of the arbitration proceeding, and any ruling, decision, or award by the arbitrator, will be strictly confidential for the benefit of all parties.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Severability</h3>
          <p className="text-muted-foreground mb-4">
            If a court or the arbitrator decides that any term or provision of this Arbitration Agreement (other than the subsection (b) titled &quot;Prohibition of Class and Representative Actions and Non-Individualized Relief&quot; above) is invalid or unenforceable, the parties agree to replace such term or provision with a term or provision that is valid and enforceable and that comes closest to expressing the intention of the invalid or unenforceable term or provision, and this Arbitration Agreement shall be enforceable as so modified. If a court or the arbitrator decides that any of the provisions of subsection (b) above titled &quot;Prohibition of Class and Representative Actions and Non-Individualized Relief&quot; are invalid or unenforceable, then the entirety of this Arbitration Agreement shall be null and void, unless such provisions are deemed to be invalid or unenforceable solely with respect to claims for public injunctive relief. The remainder of the Terms of Service will continue to apply.
          </p>

          <h3 className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[#06003F] mb-2 sm:mb-3">Future Changes to Arbitration Agreement</h3>
          <p className="text-muted-foreground">
            Notwithstanding any provision in this Terms of Service to the contrary, Voicecare agrees that if it makes any future change to this Arbitration Agreement (other than a change to the Notice Address) while you are a user of the Services, you may reject any such change by sending Voicecare written notice within thirty (30) calendar days of the change to the Notice Address provided above. By rejecting any future change, you are agreeing that you will arbitrate any dispute between us in accordance with the language of this Arbitration Agreement as of the date you first accepted these Terms of Service (or accepted any subsequent changes to these Terms of Service).
          </p>
        </section>

        {/* Termination */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Termination</h2>
          <p className="text-muted-foreground">
            You agree that Voicecare, in its sole discretion, may suspend or terminate your account (or any part thereof) or use of the Service and remove and discard any content within the Service, for any reason, including, without limitation, for lack of use or if Voicecare believes that you have violated or acted inconsistently with the letter or spirit of these Terms of Service. Any suspected fraudulent, abusive or illegal activity that may be grounds for termination of your use of Service, may be referred to appropriate law enforcement authorities. Voicecare may also in its sole discretion and at any time discontinue providing the Service, or any part thereof, with or without notice. You agree that any termination of your access to the Service under any provision of this Terms of Service may be effected without prior notice, and acknowledge and agree that Voicecare may immediately deactivate or delete your account and all related information and files in your account and/or bar any further access to such files or the Service. Further, you agree that Voicecare will not be liable to you or any third party for any termination of your access to the Service.
          </p>
        </section>

        {/* User Disputes */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">User Disputes</h2>
          <p className="text-muted-foreground">
            You agree that you are solely responsible for your interactions with any other user in connection with the Service and Voicecare will have no liability or responsibility with respect thereto. Voicecare reserves the right, but has no obligation, to become involved in any way with disputes between you and any other user of the Service.
          </p>
        </section>

        {/* General */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">General</h2>
          <p className="text-muted-foreground">
            These Terms of Service constitute the entire agreement between you and Voicecare and govern your use of the Service, superseding any prior agreements between you and Voicecare with respect to the Service. You also may be subject to additional terms and conditions that may apply when you use affiliate or third party services, third party content or third party software. These Terms of Service will be governed by the laws of the State of California without regard to its conflict of law provisions. With respect to any disputes or claims not subject to arbitration, as set forth above, you and Voicecare agree to submit to the personal and exclusive jurisdiction of the state and federal courts located within San Francisco County, California. The failure of Voicecare to exercise or enforce any right or provision of these Terms of Service will not constitute a waiver of such right or provision. If any provision of these Terms of Service is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties&apos; intentions as reflected in the provision, and the other provisions of these Terms of Service remain in full force and effect. You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Service or these Terms of Service must be filed within one (1) year after such claim or cause of action arose or be forever barred. A printed version of this agreement and of any notice given in electronic form will be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. You may not assign this Terms of Service without the prior written consent of Voicecare, but Voicecare may assign or transfer this Terms of Service, in whole or in part, without restriction. The section titles in these Terms of Service are for convenience only and have no legal or contractual effect. Notices to you may be made via either email or regular mail. The Service may also provide notices to you of changes to these Terms of Service or other matters by displaying notices or links to notices generally on the Service.
          </p>
        </section>

        {/* Your Privacy */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Your Privacy</h2>
          <p className="text-muted-foreground">
            At Voicecare, we respect the privacy of our users. For details please see our Privacy Policy. By using the Service, you consent to our collection and use of personal data as outlined therein.
          </p>
        </section>

        {/* Notice for California Users */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Notice for California Users</h2>
          <p className="text-muted-foreground">
            Under California Civil Code Section 1789.3, users of the Service from California are entitled to the following specific consumer rights notice: The Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs may be contacted in writing at 1625 North Market Blvd., Suite N 112, Sacramento, CA 95834, or by telephone at (916) 445-1254 or (800) 952-5210. You may contact us at Voicecare Technologies, Inc., Inc., 3816 Adriatic Way, San Bruno, CA 94066.
          </p>
        </section>

        {/* Questions */}
        <section>
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#06003F] mb-3 sm:mb-4">Questions?</h2>
          <p className="text-muted-foreground">
            Please contact us at{' '}
            <a href="mailto:security@voicecare.ai" className="hover:underline">
              security@voicecare.ai
            </a>
            {' '}to report any violations of these Terms of Service or to pose any questions regarding this Terms of Service or the Service.
          </p>
        </section>
      </div>
    </div>
  );
}
