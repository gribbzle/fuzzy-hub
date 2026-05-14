import { QuizWithRelationsResource } from "@portal/market/models";

const quizStepperMock: QuizWithRelationsResource = {
  public_id: "01e3554f-167a-4c88-b2d5-766e4fcf8b6c",
  name: "Pet Matching Quiz",
  status: "active",
  questions: [
    {
      public_id: "24a1b9f7-9c8d-4f3e-a1b2-c3d4e5f6g7h8",
      order_number: 1,
      text: "How much time do you spend at home each day?",
      answers: [
        {
          public_id: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6",
          text: "I’m home most of the time (I work from home)",
        },
        {
          public_id: "c1d2e3f4-g5h6-i7j8-k9l0-m1n2o3p4q5r6",
          text: "A few hours in the morning or evening",
        },
        {
          public_id: "d1e2f3g4-h5i6-j7k8-l9m0-n1o2p3q4r5s6",
          text: "I’m rarely home (lots of travel or long work hours)",
        },
      ],
    },
    {
      public_id: "35b2c0a8-ad9e-5g4f-b2c3-d4e5f6g7h8i9",
      order_number: 2,
      text: "How do you feel about daily walks and outdoor activity?",
      answers: [
        {
          public_id: "e1f2g3h4-i5j6-k7l8-m9n0-o1p2q3r4s5t6",
          text: "Love it, I’m outdoorsy and active",
        },
        {
          public_id: "f1g2h3i4-j5k6-l7m8-n9o0-p1q2r3s4t5u6",
          text: "A few hours in the morning or evening",
        },
        {
          public_id: "g1h2i3j4-k5l6-m7n8-o9p0-q1r2s3t4u5v6",
          text: "Prefer staying indoors and relaxing",
        },
      ],
    },
    {
      public_id: "46c3d1b9-be0f-6h5g-c3d4-e5f6g7h8i9j0",
      order_number: 3,
      text: "How much space do you have at home?",
      answers: [
        {
          public_id: "h1i2j3k4-l5m6-n7o8-p9q0-r1s2t3u4v5w6",
          text: "A house with a yard",
        },
        {
          public_id: "i1j2k3l4-m5n6-o7p8-q9r0-s1t2u3v4w5x6",
          text: "An apartment or condo",
        },
        {
          public_id: "j1k2l3m4-n5o6-p7q8-r9s0-t1u2v3w4x5y6",
          text: "A small studio",
        },
      ],
    },
    {
      public_id: "57d4e2c0-cf1a-7i6h-d4e5-f6g7h8i9j0k1",
      order_number: 4,
      text: "Do you have children?",
      answers: [
        {
          public_id: "k1l2m3n4-o5p6-q7r8-s9t0-u1v2w3x4y5z6",
          text: "Yes, young kids",
        },
        {
          public_id: "l1m2n3o4-p5q6-r7s8-t9u0-v1w2x3y4z5a6",
          text: "Yes, older kids or teens",
        },
        {
          public_id: "m1n2o3p4-q5r6-s7t8-u9v0-w1x2y3z4a5b6",
          text: "No children",
        },
      ],
    },
    {
      public_id: "79f6a4e2-ea3c-9k8j-f6g7-h8i9j0k1l2m3",
      order_number: 5,
      text: "How much time can you dedicate to grooming each week?",
      answers: [
        {
          public_id: "r1s2t3u4-v5w6-x7y8-z9a0-b1c2d3e4f5g6",
          text: "I prefer a low-maintenance pet (minimal grooming)",
        },
        {
          public_id: "s1t2u3v4-w5x6-y7z8-a9b0-c1d2e3f4g5h6",
          text: "Once or twice a week is fine",
        },
        {
          public_id: "t1u2v3w4-x5y6-z7a8-b9c0-d1e2f3g4h5i6",
          text: "I enjoy grooming and can do it daily",
        },
      ],
    },
    {
      public_id: "80a7b5f3-fb4d-0l9k-g7h8-i9j0k1l2m3n4",
      order_number: 6,
      text: "How do you feel about noise (barking, meowing, etc.)?",
      answers: [
        {
          public_id: "u1v2w3x4-y5z6-a7b8-c9d0-e1f2g3h4i5j6",
          text: "I prefer a very quiet pet",
        },
        {
          public_id: "v1w2x3y4-z5a6-b7c8-d9e0-f1g2h3i4j5k6",
          text: "A little noise is okay occasionally",
        },
        {
          public_id: "w1x2y3z4-a5b6-c7d8-e9f0-g1h2i3j4k5l6",
          text: "Noise doesn't bother me at all",
        },
      ],
    },
    {
      public_id: "91b8c6a4-ac5e-1m0l-h8i9-j0k1l2m3n4o5",
      order_number: 7,
      text: "What is your experience level with pets?",
      answers: [
        {
          public_id: "x1y2z3a4-b5c6-d7e8-f9g0-h1i2j3k4l5m6",
          text: "First-time pet owner",
        },
        {
          public_id: "y1z2a3b4-c5d6-e7f8-g9h0-i1j2k3l4m5n6",
          text: "Had pets as a child",
        },
        {
          public_id: "z1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6",
          text: "Experienced owner (have had several pets)",
        },
      ],
    },
    {
      public_id: "02c9d7b5-bd6f-2n1m-i9j0-k1l2m3n4o5p6",
      order_number: 8,
      text: "Are you looking for a pet that is independent or one that needs lots of attention?",
      answers: [
        {
          public_id: "a2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7",
          text: "Independent and self-sufficient",
        },
        {
          public_id: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
          text: "A mix of both",
        },
        {
          public_id: "c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r7",
          text: "A real 'velcro' pet that stays by my side",
        },
      ],
    },
    {
      public_id: "13d0e8c6-ce7a-3o2n-j0k1-l2m3n4o5p6q7",
      order_number: 9,
      text: "How do you feel about high-energy play sessions?",
      answers: [
        {
          public_id: "d2e3f4g5-h6i7-j8k9-l0m1-n2o3p4q5r6s7",
          text: "Prefer a calm and mellow pet",
        },
        {
          public_id: "e2f3g4h5-i6j7-k8l9-m0n1-o2p3q4r5s6t7",
          text: "Happy to play for 30-60 minutes a day",
        },
        {
          public_id: "f2g3h4i5-j6k7-l8m9-n0o1-p2q3r4s5t6u7",
          text: "I want an energetic pet for active play and training",
        },
      ],
    },
    {
      public_id: "24e1f9d7-df8b-4p3o-k1l2-m3n4o5p6q7r8",
      order_number: 10,
      text: "Do you have any allergies to pet dander?",
      answers: [
        {
          public_id: "g2h3i4j5-k6l7-m8n9-o0p1-q2r3s4t5u6v7",
          text: "Yes, I need a hypoallergenic pet",
        },
        {
          public_id: "h2i3j4k5-l6m7-n8o9-p0q1-r2s3t4u5v6w7",
          text: "No allergies",
        },
        {
          public_id: "i2j3k4l5-m6n7-o8p9-q0r1-s2t3u4v5w6x7",
          text: "Not sure",
        },
      ],
    },
    {
      public_id: "35f2a0e8-ea9c-5q4p-l2m3-n4o5p6q7r8s9",
      order_number: 11,
      text: "What is the primary reason you want a pet?",
      answers: [
        {
          public_id: "j2k3l4m5-n6o7-p8q9-r0s1-t2u3v4w5x6y7",
          text: "Companionship and emotional support",
        },
        {
          public_id: "k2l3m4n5-o6p7-q8r9-s0t1-u2v3w4x5y6z7",
          text: "Protection and security",
        },
        {
          public_id: "l2m3n4o5-p6q7-r8s9-t0u1-v2w3x4y5z6a7",
          text: "Teaching responsibility to children",
        },
      ],
    },
    {
      public_id: "68e5f3d1-dg2b-8j7i-e5f6-g7h8i9j0k1l2",
      order_number: 12,
      text: "What monthly budget feels comfortable for you?",
      answers: [
        {
          public_id: "n1o2p3q4-r5s6-t7u8-v9w0-x1y2z3a4b5c6",
          text: "Under $50 per month",
        },
        {
          public_id: "o1p2q3r4-s5t6-u7v8-w9x0-y1z2a3b4c5d6",
          text: "$50–$150 per month",
        },
        {
          public_id: "p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5e6",
          text: "$150–$300 per month",
        },
        {
          public_id: "q1r2s3t4-u5v6-w7x8-y9z0-a1b2c3d4e5f6",
          text: "Over $300 per month",
        },
      ],
    },
  ],
  created_at: "2026-04-16T21:50:00.000Z",
  updated_at: "2026-04-16T21:50:00.000Z",
};

export default quizStepperMock;
