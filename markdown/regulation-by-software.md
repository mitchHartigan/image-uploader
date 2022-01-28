The slippery slope of regulation by software has apparently been traversed again. On a call with software developers regarding HMDA, the Consumer Financial Protection Bureau ("Bureau") indicated that the Universal Loan Identifier ("ULI") is not case sensitive. However, that conclusion appears to be driven by software development rather than regulations. I believe it is an inappropriate determination under the regulation, particularly since the Regulation's Appendix C shows mixed case characters.

# Three parts of the ULI

The regulation at 1003.4(a)(1) defines the parameters of the ULI. It is composed of three parts, beginning with the Legal Entity Identifier ("LEI") issued by the Global LEI Foundation, which may not presently rely on case sensitive characters but could at some future date. The second part consists of 23 characters that are unique to the financial institution. The third part is a two-character check digit.

Regulation C does not explicitly restrict the uniqueness of the 23-character financial institution identifier to case insensitive use of letters. It merely states that this portion of the ULI:

“(1) May be letters, numerals, or a combination of letters and numerals;
(2) Must be unique within the financial institution; and
(3) Must not include any information that could be used to directly identify the applicant or borrower.” 12 C.F.R. § 1003.4(a)(1)(i)(B).

Regulation C does not say, and neither do the appendices or official interpretations, that the letters must be uppercase or lowercase, or that the use of letters distinguished by case does not establish sufficient uniqueness.

The Bureau could argue that the regulation says only “letters” and both “A” and “a” are the same letter. But both uppercase and lowercase letters are also distinguishable letters that meet the definition by creating uniqueness. The Bureau's use of mixed case letters in the example showing how to calculate a check digit in Appendix C further suggests that mixed case was permissible.

# Mixed case letters are unique in computer software

The ASCII/Unicode decimal code for an “X” is 88 and for an “x” is 120, these may be the same letter, but they are unique when stored or transmitted on any computer in the format dictated by the Regulation. As are the rest of the alphabet’s values for upper- and lower-case letters. The Bureau would have to implement specific software code to determine otherwise, even if that is merely setting a property of the method to determine whether case sensitive or insensitive comparison is used.

# The check digit doesn't have to be unique

In the regulation, only the 23 digit middle section of the ULI has to be unique. Not so with the last two digits of the ULI that form the check digit. Even so, the check digit is probably why the Bureau determined the financial institution number should be case insensitive. After all, the check digit formula relies on a substitution of numerals for letters where the substitution is case insensitive. In other words, you substitute 10 for an "A" as well as for an "a" and 11 for a "B" as well as for a "b", etc. However, the mere fact that two unique ULIs could have the same check digit does not destroy the uniqueness of a base identifier with different case letters.

In fact, with only two numeric digits for the check digit, it is a given that millions of unique ULIs will have the same check digits.

# Why does the Bureau think the ULI should be case insensitive?

So, why would the Bureau suggest that a ULI’s 23-character institution unique identifier should be case insensitive? There is a possibility that the Bureau’s HMDA software doesn’t actually have a limitation on case distinction for uniqueness. It could be that Bureau staff saw the check digit calculation as a limitation and assumed it would be a problem. I made that assumption myself in an earlier blog post regarding how many loans a company can make with a unique ULI. However, as discussed above, the fact that the software converts a ULI to uppercase to validate the check digit should not inhibit case sensitive uniqueness. Perhaps the Bureau has software that ignores the case of ULI letters when tracking the ULI in subsequent purchases and reporting the analysis of HMDA data. If so, that software should be revised to handle case sensitive uniqueness to conform to the regulations, which have no such restriction.

# We don't need case sensitive values to make more possibilities

As my earlier posts have indicated, the ULI supports an enormous number of loan transactions. Even without case sensitivity, it is unlikely that a lender will ever need more unique combinations if they implement a disciplined approach to allocation. However, erosion of the discipline of rulemaking and regulation through software development is a landslide waiting to happen. I raise this as a voice of concern that regulations should not be promulgated through software implementations.

For eight years during a career shift, I designed loan origination software used by three top ten mortgage lenders. During that time I learned how compulsively programmers narrow scope so they can code for a known set of determinants. But the law does not work like that. Under HMDA and most other regulations, the absence of a prohibition or substantive directive is generally treated as permissive. Thus, absent a clear indication that a letter's case is not unique, it should be treated as satisfying the uniqueness requirement of HMDA.

# The legal code is the law, the software code is merely a fact

Courts read and interpret the code of law. When courts access software code through expert witness testimony, that computer code should only reveal facts in a case. The computer code should never reveal a unique restriction of the law by which other facts are measured. Software implementations must account for the scope of the regulation, not the other way around.

Regulation C dictates the data format and content of an electronic HMDA submission. The software used to upload the data must allow for any submission that meets those minimum standards. And, if regulatory agencies cannot accommodate the scope of the law in the software they develop, they need to put the industry they regulate on notice through rulemaking to clarify the restrictions they intend to impose.

In my opinion, It is important to oppose regulation by software in its earliest forms because software can become even more difficult to change than the law. We need to prevent it from becoming an invasive species and overruling our legal system.
