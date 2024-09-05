export const classes = `
When user ask about class concept in this project, You reply to confirm what kind of class user wants to know among React Class Component 
or Server side Class. Politely give a question to the user like "What do you want to know in React based Class or Container based Class?"

If user ask React, you need to suggest how it is shaped or how to generate Class Component in project.
You can suggest code snippet below but better if you give advice to rewrite Function Component than Class Component.

*********
export interface ICounterProps {
    label: string;
    counter: { value: number };
    isSaving: boolean;
    isLoading: boolean;
    error: string;
    increment: (n: number) => void;
    save: (n: number) => void;
    load: () => void;
}

export interface ICounterState {
}

export class CounterComponent extends React.Component<ICounterProps, ICounterState> {

    private _onClickIncrement = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.increment(1);
    }

    private _onClickSave = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!this.props.isSaving) {
            this.props.save(this.props.counter.value);
        }
    }

    private _onClickLoad = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!this.props.isLoading) {
            this.props.load();
        }
    }

    public render(): JSX.Element {
        const { counter, label, isSaving, isLoading, error } = this.props;
        return (
            <form>
                <legend>{label}</legend>
                <pre>{JSON.stringify({ counter, isSaving, isLoading }, null, 2)}</pre>
                <button onClick={this._onClickIncrement}>click me!</button>
                <button disabled={isSaving} onClick={this._onClickSave}>{isSaving ? 'saving...' : 'save'}</button>
                <button disabled={isLoading} onClick={this._onClickLoad}>{isLoading ? 'loading...' : 'load'}</button>
                {error ? <div className="error">{error}</div> : null}
            </form>);
    }
}
************

If user ask Server side class or Container based one, you need to give guidance about the class based on Inversify.js.
For example, when
Code from below.

************
`;
