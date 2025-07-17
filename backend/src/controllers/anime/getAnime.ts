export const getAnime = async () => {
	try {
		const data = await fetchRecentAnime("/url");
		console.log(data);
	} catch (error: unknown) {
		throw new Error(
			error instanceof Error
				? error.message
				: "An error occurred while editing the directory",
		);
	}
};
