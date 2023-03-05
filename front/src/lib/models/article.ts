export interface Article {
	_id: string;
	title: string;
	content: string;
    summary: string;
    link: string;
    saved: boolean;
    savedBy: string[];
}
