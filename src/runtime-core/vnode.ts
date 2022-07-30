import { shapeFlags } from '../shared/shapeFlags';

export function createVNode(type, props?, children?) {
	const vnode = {
		type,
		props,
		children,
		shapeFlag: getShapeFlag(type),
		el: null,
	};

	// |  按位或   0 | 0 = 0
	// 0101 == ELEMENT & TEXT_CHILDREN  ===> element类型且 children 是 文本
	if (typeof children === 'string') {
		vnode.shapeFlag |= shapeFlags.TEXT_CHILDREN;
	} else if (Array.isArray(children)) {
		vnode.shapeFlag |= shapeFlags.ARRAY_CHILDREN;
	}

	// slot类型 -> 是组件且children是对象
	if (vnode.shapeFlag & shapeFlags.STATEFUL_COMPONENT) {
		if (typeof children === 'object') {
			vnode.shapeFlag |= shapeFlags.SLOTS_CHILDREN;
		}
	}

	return vnode;
}

function getShapeFlag(type) {
	return typeof type === 'string' ? shapeFlags.ELEMENT : shapeFlags.STATEFUL_COMPONENT;
}
