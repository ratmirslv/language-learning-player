type SubtitleProps = {
	subtitle: string
	className: string
}
export const Subtitle = ({ subtitle, className }: SubtitleProps) => (
	<div className={className}>
		<p>{subtitle}</p>
	</div>
)
