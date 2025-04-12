export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About Kamal Tech Store</h1>

      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          Welcome to Kamal Tech Store, your ultimate destination for all things electronics. Established in 2024,
          we've quickly become a trusted retailer of premium electronic products.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
        <p className="mb-4">
          Kamal Tech Store was founded by a group of tech enthusiasts who were frustrated with the lack of
          quality electronic products available in the market. We started with a simple mission: to provide
          high-quality tech products at competitive prices, backed by exceptional customer service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Promise</h2>
        <p className="mb-4">
          At Kamal Tech Store, we promise to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Offer only high-quality, genuine products</li>
          <li className="mb-2">Provide competitive pricing</li>
          <li className="mb-2">Deliver excellent customer service</li>
          <li className="mb-2">Stay up-to-date with the latest technology trends</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
        <p className="mb-4">
          Our team consists of passionate tech experts who are always ready to help you find the
          perfect product for your needs. From smartphones to laptops, we have specialists who know
          these products inside out.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Join Us</h2>
        <p className="mb-4">
          We invite you to join our growing community of satisfied customers. Browse our wide range
          of products, and don't hesitate to reach out if you have any questions.
        </p>
      </div>
    </div>
  );
} 