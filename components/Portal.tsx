import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { usePortal } from '../hooks/usePortal'

type PortalProps = {
	children: ReactNode
}
export function Portal(props: PortalProps) {
	const target = usePortal(document.querySelector('.video-js')!)
	return createPortal(props.children, target)
}
