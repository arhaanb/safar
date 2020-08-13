const defaultState = {
	user: []
}

export default function reducer(State = defaultState, { type, payload }: { type: string, payload: any }): any {
	switch (type) {
		case 'SET_USER_STATE':
			return {
				...State,
				user: {
					username: payload.split('@')[0]
				}
			}
	}

	return State
}