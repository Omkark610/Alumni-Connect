import SocialLinks from "@/components/SocialLinks";

async function getAlumni(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/alumni/${id}`, { cache: "no-store" });
  return res.json();
}

export default async function AlumniViewPage({ params }: { params: { id: string } }) {
  const alumni = await getAlumni(params.id);

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-lg w-full p-6 bg-white rounded shadow">
      <h1 className="text-2xl text-gray-700 font-bold mb-2">{alumni.name}</h1>
      <p className="text-gray-600">Batch of {alumni.passoutYear}</p>
      <p className="text-gray-700 mt-2">{alumni.email}</p>
      <SocialLinks
        linkedin={alumni.socials?.linkedin}
        instagram={alumni.socials?.instagram}
        linktree={alumni.socials?.linktree}
      />
    </div>
  </div>
  );

}
