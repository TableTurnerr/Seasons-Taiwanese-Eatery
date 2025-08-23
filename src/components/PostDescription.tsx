import React, { useState } from "react";

interface PostDescriptionProps {
	description: string | string[] | undefined;
}

export const PostDescription: React.FC<PostDescriptionProps> = ({
	description,
}) => {
	const [expanded, setExpanded] = useState(false);

	if (!description) return null;

	const text =
		typeof description === "string" ? description : description.join("\n");

	return (
		<div>
			<div
				className={`whitespace-pre-line transition-all duration-300 ${
					expanded ? "" : "line-clamp-2"
				}`}
			>
				{text}
			</div>

			{text.split("\n").length > 2 && (
				<button
					className="text-blue-500 mt-2 hover:underline"
					onClick={(e) => {
						e.stopPropagation();
						setExpanded(!expanded);
					}}
				>
					{expanded ? "Show less" : "Read more"}
				</button>
			)}
		</div>
	);
};
