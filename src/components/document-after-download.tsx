type DocumentAfterDownloadProps = {
  items: string[];
};

export function DocumentAfterDownload({ items }: DocumentAfterDownloadProps) {
  return <InfoBlock title="Что делать после скачивания" items={items} />;
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li className="leading-7 text-[#42423f]" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
