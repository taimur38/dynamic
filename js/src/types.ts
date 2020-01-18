namespace Dynamic {
	export interface Layer<T> {
		path: Array<string>
		value: T
	}

	export interface IObject {
		[key: string]: any
	}
}